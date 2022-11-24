// 1 - Iniciando projeto
//console.log("Expreaaass + TS")

// 2 - init express
import { resolveObjectURL } from 'buffer'
import express, {NextFunction, Request, Response} from 'express'
import { readFile } from 'fs'

const app = express()

// habilita a trabalhar com json na aplicação
app.use(express.json())

// Middleware par todas as rotas, usar o métodos use; criar uma função e atrelar ao método.
function showPath(req: Request, res: Response, next: NextFunction) {
  console.log(req.path)
  next(); // todo middleware tem que ter a função next para destravar pro usuário
}

app.use(showPath);

// definir rota, endpoint; no express se define dois parâmetros depois da rota (requisição e resposta)
app.get("/", (req, res) => {
  return res.send("Hello express!")
})

app.post("/api/product", (req, res) => {
  console.log(req.body)

  return res.send("Produto adicionado!")
})

// Utilizando o método all, podemos criar uma rota que aceita qualquer verbo, é interessante para quando um endpoint precisa realizar váruas funções
app.all("/api/product/check", (req, res) => {
  // req.method = VERBO HTTP

  if (req.method === "POST") {
    res.send("INSERIR REGISTRO")
  }
  if (req.method === "GET") {
    res.send("LER REGISTRO")
  }
  res.send("não foi possível realizar essa operação")
})

// Interfaces do express
app.get("/api/interfaces", (req: Request, res: Response) => {
  return res.send("Utilizando as interfaces")
})

// enviando json
app.get("/api/json", (req: Request, res: Response) => {
  return res.json({
    teste: "haha",
    cl: 234
  })
})

//  router parameters 
app.get("/api/product/:id", (req: Request, res: Response) => {
   console.log(req.params)

   const id = req.params.id

   if(id === "1") {
    const product = {
      id: 1,
      name: "camisa"
    }

    return res.json(product)
   }

   return res.send("produto não encontrado")
})

// Rotas com mais de um parâmtro, o padrão é: /algo/:param1/outracoisa/:param2
app.get("/api/product/:productId/review/:reviewId", (req: Request, res: Response) => {
  console.log(req.params)

  const productId = req.params.productId
  const reviewId = req.params.reviewId

  if(productId === "1") {
   const product = {
     id: 1,
     name: "camisa"
   }

   return res.json(product)
  }

  return res.send("produto não encontrado")
})

// Router handler -> Retiramos a função anônima de uma rota e a externalizamos em uma função, podendo a reaproveitar
function getUser(req: Request, res: Response) {
  return res.send("foi")
}

app.get("/api/user/:id", getUser)

// Middleware
function checkUser(req: Request, res: Response, next: NextFunction) {
  if(req.params.id === "1") {
    console.log("pode seguir!");
    next();
  } else {
    console.log("acesso restrito")
    return res.send("acesso restrito")
  }
}

app.get("/api/user/:id/access", checkUser, (req: Request, res: Response) => {
  return res.send("bem-vindo")
})

// req e res com generics
app.get("/api/user/:id/details/:name", (req: Request<{id: string; name: string}>, res: Response<{status: boolean}>) => {
  return res.json(req.params.name == "a" ? {status: true} : {status: false})
})

// tratando erros com try catch
app.get("/api/error", (req: Request, res: Response) => {
  try {
    throw new Error("Algo deu errado!")
  } catch (e: any) {
    res.statusCode = 500
    res.json({msg: e.message})
  }
})


// porta que vai ser o endpoint + callback que é o que vai ser executado dps de ser chamado
app.listen(3000, () => {
  console.log("deu certo")
})