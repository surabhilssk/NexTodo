interface AuthFormProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthForm = ({
  label,
  placeholder,
  type,
  onChange,
}: AuthFormProps) => {
  return (
    <div className="flex justify-center flex-col mb-4">
      <div>
        <label className="block text-sm font-extrabold text-gray-600">
          {label}
        </label>
        <input
          type={type || "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};
