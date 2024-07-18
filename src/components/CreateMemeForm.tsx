import React from 'react';
import { useForm } from 'react-hook-form';

interface CreateMemeFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  text: string;
}

const CreateMemeForm: React.FC<CreateMemeFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('text')} placeholder="Enter meme text" />
      <button type="submit">Create Meme</button>
    </form>
  );
};

export default CreateMemeForm;
