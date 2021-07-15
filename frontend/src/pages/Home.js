import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Header, Image } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
console.log("These are posts",posts,user)
  return (
    <div>
    <Header as='h2' icon textAlign='center' style={{ margin: 40 }}>
      {/* <Icon name='users' circular /> */}
      {
        user?      <Image
        // floated="center"
        size="mini"
        style={{borderRadius:50, height:80, width:80}}
        src={user.image!==""?user.image:"https://i.imgur.com/xGPAyXi.png"}
        // src={user.url}
      />:<Image
      // floated="center"
      size="mini"
      style={{borderRadius:50, height:80, width:80}}
      src={"https://i.imgur.com/xGPAyXi.png"}
      // src={user.url}
    />
      }

        <div style={{width:'100%', height:20}}></div>
      <Header.Content>Recent Posts</Header.Content>
    </Header>

    <Grid divided='vertically'>
      <Grid.Row columns={2}>
        
        <Grid.Column width={6}>
        {user && (
          <Grid.Row  >
            <PostForm />
          </Grid.Row>
        )}
        </Grid.Column>

        
        <Grid.Column width={10}>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Grid.Row style={{ marginBottom: 20 }} >
            {posts &&
              posts.map((post) => (
                <Grid.Row key={post.id} style={{ marginBottom: 20 }} >
                  <PostCard post={post} />
                </Grid.Row>
              ))}
          </Grid.Row>
        )}
      </Grid.Column>
      </Grid.Row>
    
   </Grid>
   </div> 
  );
}

export default Home;
