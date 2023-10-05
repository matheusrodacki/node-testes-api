/* eslint-disable no-undef */
import app from "../../app.js";
import request from "supertest";

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET em /editoras", () => {
  it("Deve retornar uma lista de editoras", async () => {
    const resposta = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual("e@e.com");
  });
});

let idResposta;
describe("POST em /editoras", () => {
  it("Deve adicionar uma nova editora", async () => {
    const resposta = await request(app)
      .post("/editoras")
      .send({
        nome: "CDC",
        cidade: "São Paulo",
        email: "s@s.com",
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });
  it("Deve não adicionar nada ao passar o body vazio", async () => {
    await request(app).post("/editoras").send({}).expect(400);
  });
});

describe("PUT em /editoras", () => {
  it("Deve alterar o registro adicionado", async () => {
    await request(app)
      .put(`/editoras/${idResposta}`)
      .send({
        email: "contato@cdc.com",
      })
      .expect(204);
  });
});

describe("GET em /editoras/id e ", () => {
  it("Verifica se o registro foi alterado no PUT", async () => {
    const resposta = await request(app)
      .get(`/editoras/${idResposta}`)
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(resposta.body.email).toEqual("contato@cdc.com");
  });
});

describe("DELETE em /editoras/id", () => {
  it("Deve deletar o registro adicionado", async () => {
    await request(app).delete(`/editoras/${idResposta}`).expect(200);
  });
});
