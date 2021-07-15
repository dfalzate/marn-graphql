import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";


import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "../util/MyPopup";

import Linkify from "react-linkify";

function PostCard({
  post: { body, createdAt, id, username, email, likeCount, commentCount, likes, image },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card 
      fluid style={{ marginTop: 45 }}
      
      >
      <Card.Content >
        <Image
          floated="right"
          size="mini"
          style={{borderRadius:50}}
          src={image||"https://i.imgur.com/xGPAyXi.png"}
        />
        <Card.Header>{username}</Card.Header>
        <br></br>
        <Card.Meta >
          Created {moment(createdAt).fromNow(true)} ago
        </Card.Meta>
        <br></br>
        <Linkify>
        <Card.Description
        as={Link} to={`/posts/${id}`}>
        {body}
        </Card.Description>
        </Linkify>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.email === email && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
