import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState("");
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
    onError(err) {
      console.log(err);
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
    onError(err) {
      console.log(err);
      commentInputRef.current.blur();
    },
  });
  function deletePostCallback() {
    props.history.push("/");
  }
  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="data:image/jpeg;base64,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"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments"></Icon>
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;
