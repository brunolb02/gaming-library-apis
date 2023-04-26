import jwt_decode from 'jwt-decode';

interface IToken {
  id: number;
  email: string;
}

export function decodeAccessToken(accessToken: string): IToken {
  const decodeToken = jwt_decode(accessToken);
  const id = decodeToken['id'];
  const email = decodeToken['email'];
  return {
    id,
    email,
  };
}
