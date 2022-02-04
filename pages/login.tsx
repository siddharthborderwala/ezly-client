import React from 'react';
import useAuth from '../contexts/auth';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    e.persist();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const result = await login(
        data.email.toString(),
        data.password.toString()
      );
      console.log(result);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@example.com"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <label htmlFor="email">Password</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
