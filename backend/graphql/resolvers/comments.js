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
        throw new UserInputError('No hay texto.', {
          errors: {
            body: 'Esto no debe quedar vacío.'
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
        
        sgMail.setApiKey(
          SENDGRID
        );
        const msg = {
          
          to: post.email,
          from: SENDER, 
          subject: "Te dejaron un comentario en el MiniForo 🥳 📩",
          text: "Tu posteo recibió un comentario de "+username,
          html: `
          <p>Tu posteo " ${post.body} " recibió este comentario " ${body} " de ${username} 🥳 </p>
          `,
        };
        sgMail
          .send(msg)
          .then(() => {
            return console.log("Email enviado a: " + msg.to );
          })
          .catch((error) => {
            return console.error(error);
          });
        return post;
      } else throw new UserInputError('Posteo no encontrado');
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
          throw new AuthenticationError('No está autorizado.');
        }
      } else {
        throw new UserInputError('Posteo no encontrado');
      }
    }
  }
};