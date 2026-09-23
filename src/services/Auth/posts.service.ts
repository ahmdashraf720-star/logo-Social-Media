import axios from "axios";
import { baseUrl } from "../../api/evn";

export async function getAllPosts(token: string) {
  const response = await axios.get(`${baseUrl}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function createPost(
  token: string,
  formData: FormData
) {
  const response = await axios.post(
    `${baseUrl}/posts`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

export async function likePost(
  token: string,
  postId: string
) {
  return axios.put(
    `${baseUrl}/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function bookmarkPost(
  token: string,
  postId: string
) {
  return axios.put(
    `${baseUrl}/posts/${postId}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


// Get Comments
export async function getPostComments(
  token: string,
  postId: string
) {
  return axios.get(
    `${baseUrl}/posts/${postId}/comments?page=1&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// Create Comment
export async function createComment(
  token: string,
  postId: string,
  content: string
) {
  const formData = new FormData();

  formData.append("content", content);

  return axios.post(
    `${baseUrl}/posts/${postId}/comments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}



// =========================
// Update Post
// =========================

export async function updatePost(
  token: string,
  postId: string,
  formData: FormData
) {
  return axios.put(
    `${baseUrl}/posts/${postId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// Delete Post
// =========================

export async function deletePost(
  token: string,
  postId: string
) {
  return axios.delete(
    `${baseUrl}/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getSinglePost(
  token: string,
  postId: string
) {
  return axios.get(
    `${baseUrl}/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}