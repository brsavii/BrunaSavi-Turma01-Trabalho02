import { spec } from 'pactum';

describe('Cadastro de Empresa', () => {
    it('Deve cadastrar uma nova empresa', async () => {
        const empresa = {
            name: 'tste banana 1233',
            cnpj: "47626916000115",
            state: "teste",
            city: "teste",
            address: "teste",
            sector: "teste",
        };

        // Executa a requisição e aguarda a resposta
        await spec()
            .post('https://api-desafio-qa.onrender.com/company') // Endpoint da API
            .withJson(empresa) // Envia o corpo da requisição
            .expectStatus(201) // Espera um status de sucesso
            .expectJsonLike({ // Espera que a resposta tenha um formato semelhante
                name: empresa.name,
                state: empresa.state,
                city: empresa.city,
                address: empresa.address,
                cnpj: empresa.cnpj,
                sector: empresa.sector,
            })
            .toss(); // Executa a requisição

        const response = await spec().get('https://api-desafio-qa.onrender.com/company')
            .expectStatus(200);

        const id = response.body[3].id;
        console.log('sasaaaa', id)
    });
});

describe('Listagem de Empresas e deletar empresas', () => {
    let id: number;
    it('Deve retornar todas as empresas cadastradas', async () => {

        const response = await spec().get('https://api-desafio-qa.onrender.com/company')
            .expectStatus(200);

        id = response.body[3].id;
    });

    it('Deve obter a empresa cadastrada pelo ID', async () => {
        expect(id).toBeDefined();

        const response = await spec()
            .get(`https://api-desafio-qa.onrender.com/company/${id}`)
            .expectStatus(200);
    });

    it('Deve deletar a empresa cadastrada', async () => {
        expect(id).toBeDefined();

        await spec()
            .delete(`https://api-desafio-qa.onrender.com/company/${id}`)
            .expectStatus(200);

        await spec()
            .get(`https://api-desafio-qa.onrender.com/company/${id}`)
            .expectStatus(404);
    });
});


