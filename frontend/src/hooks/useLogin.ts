import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/queries';
import { LoginResponse } from '../types';

export function useLogin() {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    const result = await loginMutation({
      variables: { username, password },
    });
    const response: LoginResponse = JSON.parse(result.data.login);
    return response;
  };

  return { login, loading, error };
}
