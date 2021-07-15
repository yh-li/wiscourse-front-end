import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Icon, Label, Button, Popup } from "semantic-ui-react";
import gql from "graphql-tag";
function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);
  //the dependency array of useEffect is the variables that once changed
  //useEffect will go through the callback function and
  //re-evaluate the valuess
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      //the user has already liked the post
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err);
    },
  });
  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  const popupContent = user ? (liked ? "Unlike" : "Like") : "Like";
  return (
    <Popup
      content={popupContent}
      inverted
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
export default LikeButton;
