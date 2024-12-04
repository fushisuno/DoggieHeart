const session = require('express-session');
const nodemailer = require('nodemailer')


class EmailController {
    static async sendEmail(req, res) {
        const { nomeResponsavel, nome, cidade, rua, numero, bairro, estado, email } = req.body
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "da453da2bdbe68",
                pass: "40fb1ee0b5239d"
            }
        });
        await transport.sendMail({
            from: 'doggieheart@spamok.com',
            to: 'kaina.doggie@spamok.com',
            subject: `Pedido de Cadastro de Veterinaria`,
            html: `<div class="container">
                        <h1>Solicitação de Adesão ao Doggie Heart</h1>
                        <p><strong>A quem possa interessar,</strong></p>
                        <p>Meu nome é <strong>${nomeResponsavel}</strong>, e sou o responsável pela <strong>${nome}</strong>, localizada em <strong>${cidade + ', ' + rua + ', ' + numero + ' - ' + estado}</strong>. Com uma equipe apaixonada e experiente, temos nos dedicado a oferecer o melhor cuidado para os animais da nossa comunidade.</p>
                        <p>Acreditamos que a saúde e o bem-estar dos pets vão além da consulta veterinária. É por isso que fazemos questão de estabelecer laços fortes com os tutores e proporcionar uma experiência que valoriza o relacionamento com os nossos queridos pacientes de quatro patas.</p>
                        <p>Estamos entusiasmados com a possibilidade de fazer parte do <strong>Doggie Heart</strong>, uma plataforma que promove o cuidado integral e a felicidade dos nossos amigos peludos. Acreditamos que, juntos, podemos criar um ambiente ainda mais acolhedor e eficiente para atender nossos clientes e seus animais.</p>
                        <p>Gostaríamos de solicitar nossa adesão ao Doggie Heart, assim como compartilhar nossas iniciativas, dicas e experiências com outros profissionais da área, incentivando o cuidado responsável e apaixonado que todos buscamos.</p>
                        <p>Estamos à disposição para fornecer mais informações e esperamos ansiosamente pela oportunidade de colaborar com vocês.</p>
                        <p>Para contato, por favor, sintam-se à vontade para nos escrever pelo e-mail: <strong>${email}</strong>.</p>
                        <p>Agradecemos pela atenção e aguardamos uma resposta positiva para que possamos juntos transformar a vida de muitos pets!</p>
                        <p>Atenciosamente,</p>
                        <p><strong>${nomeResponsavel}<br>${nome}</p>
                    </div>`,
            text: `A quem possa interessar, 
                Meu nome é ${nomeResponsavel}, e sou o responsável pela ${nome}, localizada em ${cidade + ', ' + rua + ', ' + numero + ' - ' + estado}. Com uma equipe apaixonada e experiente, temos nos dedicado a oferecer o melhor cuidado para os animais da nossa comunidade. 
                Acreditamos que a saúde e o bem-estar dos pets vão além da consulta veterinária. É por isso que fazemos questão de estabelecer laços fortes com os tutores e proporcionar uma experiência que valoriza o relacionamento com os nossos queridos pacientes de quatro patas.
                Estamos entusiasmados com a possibilidade de fazer parte do Doggie Heart, uma plataforma que promove o cuidado integral e a felicidade dos nossos amigos peludos. Acreditamos que, juntos, podemos criar um ambiente ainda mais acolhedor e eficiente para atender nossos clientes e seus animais.
                Gostaríamos de solicitar nossa adesão ao Doggie Heart, assim como compartilhar nossas iniciativas, dicas e experiências com outros profissionais da área, incentivando o cuidado responsável e apaixonado que todos buscamos.
                Estamos à disposição para fornecer mais informações e esperamos ansiosamente pela oportunidade de colaborar com vocês. 
                Para contato, por favor, sintam-se à vontade para nos escrever pelo e-mail: ${email}.
                Agradecemos pela atenção e aguardamos uma resposta positiva para que possamos juntos transformar a vida de muitos pets!
                Atenciosamente,
                ${nomeResponsavel}
                ${nome}`
        }).then(() => console.log("Email Enviado"))
            .catch((err) => {
                console.log(err)
            })
        res.redirect('/');
    }

    static async sendEmailVeterinaria(req, res) {
        const nome = req.params.nome.replace(/^:/, '');
        const email = req.params.email.replace(/^:/, '');
        const senha = req.params.senha.replace(/^:/, '');
        console.log(email)

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "da453da2bdbe68",
                pass: "40fb1ee0b5239d"
            }
        });
        await transport.sendMail({
            from: 'doggieheart@spamok.com',
            to: `${email}`,
            subject: `Pedido de Cadastro de Veterinaria`,
            html: `<div class="container">
                        <h1>Confirmação de Cadastro no Doggie Heart</h1>
                        <p><strong>A quem possa interessar,</strong></p>
                        <p>Gostaríamos de agradecer a ${nome}, pelo seu pedido de adesão ao <strong>Doggie Heart</strong>. Estamos muito felizes em tê-la conosco e em poder contribuir para o cuidado e bem-estar dos pets.</p>
                        <p>Para acessar o sistema, por favor, utilize o seguinte e-mail e senha:</p>
                        <p><strong>E-mail:</strong> ${email}</p>
                        <p><strong>Senha:</strong> ${senha}</p>
                        <p>Com esses dados, você poderá acessar todas as funcionalidades da plataforma e começar a compartilhar suas experiências com outros profissionais da área.</p>
                        <p>Estamos à disposição para esclarecer qualquer dúvida e oferecer suporte no que for necessário. Ficamos felizes em contar com sua participação e esperamos que, juntos, possamos promover um ambiente ainda mais acolhedor e eficiente para os animais.</p>
                        <p>Agradecemos mais uma vez pela confiança e esperamos uma parceria de sucesso!</p>
                        <p>Atenciosamente,</p>
                        <p><strong>Equipe Doggie Heart</strong></p>
                    </div>`,
            text: `A quem possa interessar,
                Gostaríamos de agradecer pelo seu pedido de adesão ao Doggie Heart. Estamos muito felizes em tê-los conosco e em poder contribuir para o cuidado e bem-estar dos pets.
                Para acessar o sistema, por favor, utilize as seguintes informações de login:
                E-mail: ${email}
                Senha: ${senha}
                Com esses dados, você poderá acessar todas as funcionalidades da plataforma e começar a compartilhar suas experiências com outros profissionais da área.
                Estamos à disposição para esclarecer qualquer dúvida e oferecer suporte no que for necessário. Ficamos contentes em contar com sua participação e esperamos que, juntos, possamos promover um ambiente ainda mais acolhedor e eficiente para os animais.
                Agradecemos mais uma vez pela confiança e esperamos uma parceria de sucesso!
                Atenciosamente,
                Equipe Doggie Heart`
        }).then(() => console.log("Email Enviado"))
            .catch((err) => {
                console.log(err)
            })
        res.redirect('/veterinaria/')
    }
}

module.exports = EmailController;