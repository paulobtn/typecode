const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require('../../repos/source-repo');
const pool = require('../../pool');
const Context = require('../context');

let context;
beforeAll(async () => {
  //create new role and schema to run the tests
  context = await Context.build();
});

beforeEach(async () => {
  //delete data from the table before the tests
  await context.reset();
});

afterAll(() => {
  //delete the created role and schema
  return context.close();
});

it('Include a new source code', async () => {
  const startingCount = await UserRepo.count();

  await request(buildApp())
    .post('/source')
    .send({
        language: "c",
        project: "git",
        uri: "https://github.com/git/git/blob/master/archive.c",
        src: "void init_archivers(void)\n{\n\tinit_tar_archiver();\n\tinit_zip_archiver();\n}\n"
    })
    .expect(201);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
