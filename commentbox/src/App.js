import './App.css'
import { useState } from 'react';
export default function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [editCommentIndex, setEditCommentIndex] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const comment = {
        text: newComment,
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleEditComment = (commentIndex) => {
    setEditCommentIndex(commentIndex);
  };

  const handleCommentUpdate = (e, commentIndex) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const updatedComments = [...comments];
      updatedComments[commentIndex].text = newComment;
      setComments(updatedComments);
      setNewComment('');
      setEditCommentIndex(null);
    }
  };

  const handleReplySubmit = (e, commentIndex) => {
    e.preventDefault();
    if (replyText.trim() !== '') {
      const reply = {
        text: replyText,
      };
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies.push(reply);
      setComments(updatedComments);
      setReplyText('');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit">Submit Comment</button>
      </form>

      {comments.map((comment, commentIndex) => (
        <div key={commentIndex}>
          <p>{comment.text}</p>
          <button onClick={() => handleEditComment(commentIndex)}>Edit</button>

          <form onSubmit={(e) => handleCommentUpdate(e, commentIndex)}>
            {editCommentIndex === commentIndex && (
              <input
                type="text"
                placeholder="Edit comment..."
                value={newComment}
                onChange={handleCommentChange}
              />
            )}
            {editCommentIndex === commentIndex ? (
              <button type="submit">Update Comment</button>
            ) : (
              <button disabled>Edit</button>
            )}
          </form>

          <form onSubmit={(e) => handleReplySubmit(e, commentIndex)}>
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={handleReplyChange}
              style={{ marginLeft: '20px' }}
            />
            <button type="submit">Reply</button>
          </form>

          {comment.replies.map((reply, replyIndex) => (
            <div key={replyIndex} style={{ marginLeft: '20px' }}>
              <p>{reply.text}</p>
              
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
