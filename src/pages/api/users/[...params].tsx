import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const id = request.query;

  const users = [
    { id: 1, name: "Davys" },
    { id: 2, name: "Cele" },
    { id: 3, name: "Lene" },
  ];

  return response.json(users);
};
