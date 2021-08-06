import { useState } from "react";
import apiClient from "services/apiClient";

export const useReplyForm = ({ ratingId }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    replyBody: "",
  });

  const resetForm = () => {
    setForm({
      replyBody: "",
    });
  };

  const handleOnInputChange = (event) => {
    if (event.target.name === "replyBody") {
      if (event.target.value === "") {
        setErrors((e) => ({
          ...e,
          reply: "Reply Body cannot be empty.",
        }));
      } else {
        setErrors((e) => ({ ...e, reply: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  /**
   * handleOnSubmit
   *
   * @param {*} setShow - useState function to close form popup
   * @param {*} replies - useState object with arrays of reply objects for a single rating/review
   * @param {*} setReplies - useState for modifying replies object
   * @param {*} repliesIdx - int that identifies which array to modify
   */
  const handleOnSubmit = async (setShow, replies, setReplies, repliesIdx) => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, reply: null }));

    const { data, error } = await apiClient.createNewReplyForRating(ratingId, {
      replyBody: form.replyBody,
    });

    if (error) {
      setErrors((e) => ({ ...e, reply: error }));
    }
    if (data?.reply) {
      let newReplies;
      if (replies[repliesIdx]) {
        newReplies = [...replies[repliesIdx], data.reply];
      } else {
        newReplies = [data.reply];
      }
      setReplies((oldReplies) => ({ ...oldReplies, [repliesIdx]: newReplies }));
      setShow(false);
      resetForm();
    }

    setIsProcessing(false);
  };

  /**
   * handleOnUpdate
   *
   * @param {*} setShow - useState function to close form popup
   * @param {*} replyId - int that identifies a specific reply
   * @param {*} replies - useState object with arrays of reply objects for a single rating/review
   * @param {*} setReplies - useState for modifying replies object
   * @param {*} repliesIdx - int that identifies which array to modify
   */
  const handleOnUpdate = async (
    setShow,
    replyId,
    replies,
    setReplies,
    repliesIdx
  ) => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, reply: null }));

    const { data, error } = await apiClient.updateReplyForRating(replyId, {
      replyBody: form.replyBody,
    });

    if (error) {
      setErrors((e) => ({ ...e, reply: error }));
    }
    if (data?.reply) {
      // remove previous reply from array then insert updated reply at front
      const newData = replies[repliesIdx].filter(
        (r) => !(r.id === data.reply.id)
      );
      newData.unshift(data.reply);
      setReplies((r) => ({ ...r, [repliesIdx]: newData }));
      setShow(false);
    }

    setIsProcessing(false);
  };

  const handleOnDelete = async (replyId, replies, setReplies, repliesIdx) => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, reply: null }));

    const { data, error } = await apiClient.deleteReplyForRating(replyId);

    if (error) {
      setErrors((e) => ({ ...e, reply: error }));
    }
    if (data?.reply) {
      // TODO: explore more efficient ways to remove an item from an array
      const newData = replies[repliesIdx].filter(
        (r) => !(r.id === data.reply.id)
      );
      setReplies((r) => ({ ...r, [repliesIdx]: newData }));
    }

    setIsProcessing(false);
  };

  return {
    form,
    errors,
    isProcessing,
    setIsProcessing,
    resetForm,
    setForm,
    setErrors,
    handleOnInputChange,
    handleOnSubmit,
    handleOnUpdate,
    handleOnDelete,
  };
};
