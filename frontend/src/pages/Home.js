import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Header} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <div style={{ marginTop: 40, marginBottom: 100 }}>
    <Header as='h1' icon textAlign='center' style={{ fontSize: 50, color: 'midnightblue', width: '30%', margin: 'auto', padding: 20, borderRadius: 10, backgroundColor: 'snow' }}>
      <Header.Content><u>MiniForo</u></Header.Content>
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
          <h1>Buscando en la DB...</h1>
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
