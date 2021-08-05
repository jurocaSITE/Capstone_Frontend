import { useState } from "react";
import apiClient from "services/apiClient";

export const useReplyForm = ({ ratingId, setReplies }) => {
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
      const newReplies = [...replies[repliesIdx], data.reply];
      setReplies((oldReplies) => ({ ...oldReplies, [repliesIdx]: newReplies }));
      setShow(false);
    }

    setIsProcessing(false);
  };

  const handleOnUpdate = async (replyId) => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, reply: null }));

    const { data, error } = await apiClient.updateReplyForRating(replyId, {
      replyBody: form.replyBody,
    });

    if (error) {
      setErrors((e) => ({ ...e, reply: error }));
    }
    if (data?.reply) {
      console.log("Reply updated...", data.reply);
    }

    setIsProcessing(false);
  };

  const handleOnDelete = async (replyId) => {
    // setIsProcessing(true);
    setErrors((e) => ({ ...e, reply: null }));
    let deletedItem = null;

    const { data, error } = await apiClient.deleteReplyForRating(replyId);

    if (error) {
      setErrors((e) => ({ ...e, reply: error }));
      deletedItem = null;
    }
    if (data?.reply) {
      console.log("Reply deleted...", data.reply);
      deletedItem = data.reply;
    }

    // setIsProcessing(false);
    return deletedItem;
  };

  return {
    form,
    errors,
    isProcessing,
    setIsProcessing,
    resetForm,
    setErrors,
    handleOnInputChange,
    handleOnSubmit,
    handleOnUpdate,
    handleOnDelete,
  };
};
