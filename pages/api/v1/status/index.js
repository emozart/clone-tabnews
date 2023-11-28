import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log("result:\n", result.rows);
  response
    .status(200)
    .json({ mensagem: "Alunos do curso.dev são acima da mádia." });
}

export default status;
