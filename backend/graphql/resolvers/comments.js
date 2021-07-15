const { AuthenticationError, UserInputError } = require('apollo-server');
const sgMail = require("@sendgrid/mail");
const { SENDGRID, SENDER } = require("../../config");
const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username,email } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        console.log("This is the comment added", body, email, SENDGRID)
        sgMail.setApiKey(
          SENDGRID
        );
        const msg = {
          
          to: post.email,
          from: SENDER, // Change to your verified sender
          subject: "New Comment",
          text: "Your Post has a new comment from "+username,
          html: `
          <p>Your post " ${post.body} " has recieved a new comment " ${body} " from ${username} </p>
              `,
        };
        sgMail
          .send(msg)
          .then(() => {
            return console.log("Email sent to: " + msg.to );
          })
          .catch((error) => {
            return console.error("This is error", error);
          });
        return post;
      } else throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
};