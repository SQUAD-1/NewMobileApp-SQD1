import { Link } from "react-router-dom";
import { BackButton } from "../../Components/BackButton";
import { HeaderRegister, RegisterButton, RegisterContainer, TitleInputArea, FormInput, InputArea } from "./styles";
import { SelectOption } from "../../Components/SelectOption";
import setores from "../../mocks/setores";
import { useState } from "react";
import axios from "axios";
import RegisterIcon from "./images/Register.png";
import { Legend, LegendText } from "../../Components/FildestInput/styles";

interface UserRegisterProps {
  matricula: number;
  nome: string;
  funcao: string;
  email: string;
  senha: string;
  resolutor: number;
  setor_idSetor: number;
  filial_idFilial: number;
}

export const UserRegister = () => {

	const [formState, setFormState] = useState<UserRegisterProps>({
		matricula: 0,
		nome: "",
		funcao: "",
		email: "",
		senha: "",
		resolutor: 0,
		setor_idSetor: 0,
		filial_idFilial: 0,
	});


	// eslint-disable-next-line no-unused-vars
	function PostRegister (formMatricula: number, formNome: string, formFuncao: string, formEmail: string, formSenha: string, formResolutor: number, formSetorIdSetor: number, formFilialIdFilial: number) {
		const matricula = formMatricula;
		const nome= formNome;
		const funcao = formFuncao;
		const email = formEmail;
		const senha = formSenha;
		const resolutor = formResolutor;
		const setor_idSetor = formSetorIdSetor;
		const filial_idFilial = formFilialIdFilial; 
		
		axios
			.post("https://fc-services-server.onrender.com/CadastrarUsuario", { matricula, nome, funcao, email, senha, resolutor, setor_idSetor, filial_idFilial })
			.then((response) => {
				localStorage.setItem("userData", JSON.stringify(response.data));
				window.location.href = "/Login";
			});
	}
  
	return (
		<>
			<RegisterContainer>
				<Link to="/login">
					<BackButton
						actionText={"Login"}
						color="#AA0E27"
						fontWeight={"600"}
					/>
				</Link>
				<HeaderRegister>
					Para começarmos, preencha as informações abaixo:
				</HeaderRegister>
				<TitleInputArea>Quem é você?</TitleInputArea>
				<InputArea>
					<Legend>
						<LegendText>{"Matrícula"}</LegendText>
					</Legend>
					<FormInput					
						onChange={(e: any) => {
							setFormState({
								...formState,
								matricula: e.target?.value,
							});
						}}
						placeholder="Ex: 99999"
						width="auto"
						maxLength={5}
						height="56px"
            
					/>
				</InputArea>	
				<InputArea>
					<Legend>
						<LegendText>{"Nome"}</LegendText>
					</Legend>
					<FormInput					
						onChange={(e) => {
							setFormState({
								...formState,
								nome: e.target?.value,
							});
						}}
						placeholder="Ex: João de Barros"
						width="auto"
						maxLength={80}
						height="56px"/>
				</InputArea>
				<TitleInputArea>Qual sua filial?</TitleInputArea>
				<SelectOption
					onChange={(e: any) => {
						setFormState({
							...formState,
							filial_idFilial: e.target?.value,
						});
					}}
					legendText="Filial"
					height="56px"
					width="auto">
					<option
						value=""
						disabled
						selected>
						Qual sua filial?
					</option>
					<option value="1">Garanhuns - PE</option>
					<option value="2">Imbiribeira - PE</option>
					<option value="3">Salvador - BA</option>
					<option value="4">Tamarineira - PE</option>
					<option value="5">Aracaju - SE</option>
					<option value="6">João Pessoa - PB</option>
					<option value="7">Natal - RN</option>
					<option value="8">Caruaru - PE</option>
				</SelectOption>
				
				<TitleInputArea>O que você faz?</TitleInputArea>
				<SelectOption
					onChange={(e) => {
						setFormState({
							...formState,
							funcao: e.target?.value,
							resolutor: 0,
						});
					}}
					legendText="Setor"
					height="56px"
					width="auto">
					<option
						value=""
						disabled
						selected>
						Qual setor você trabalha?
					</option>
					{setores?.map((setor) => (
						<option
							key={setor.id}
							value={setor.id}>
							{setor.setor}
						</option>
					))}
				</SelectOption>
				<SelectOption
					onChange={(e: any) => {
						setFormState({
							...formState,
							setor_idSetor: e.target?.value,
						});
					}}
					legendText="Cargo"
					height="56px"
					width="auto">
					<option
						value=""
						disabled
						selected>
						Qual seu cargo?
					</option>
					<option value="1">System Analytics</option>
					<option value="2">Software Engineer</option>
					<option value="3">Prompt Engineer</option>
					<option value="4">Head of Technology</option>
					<option value="5">Cientista de Dados</option>
					<option value="6">Vendedor</option>
					<option value="7">Analista de inovação</option>
				</SelectOption>
				
				<TitleInputArea>Crie seu acesso</TitleInputArea>
				<InputArea>
					<Legend>
						<LegendText>{"Email"}</LegendText>
					</Legend>
					<FormInput					
						onChange={(e) => {
							setFormState({
								...formState,
								email: e.target?.value,
							});
						}}
						placeholder="Ex: joao.barros@fc.com"
						width="auto"
						maxLength={45}
						height="56px"/>
				</InputArea>	
				<InputArea>
					<Legend>
						<LegendText>{"Senha"}</LegendText>
					</Legend>
					<FormInput					
						onChange={(e) => {
							setFormState({
								...formState,
								senha: e.target?.value,
							});
						}}
						placeholder="Ex: Digite sua senha"
						width="auto"
						maxLength={30}
						minLength={8}
						height="56px"/>
				</InputArea>

				<RegisterButton 							
					type="submit"
					// disabled={!isInactiveButton}
					// isInactive={!isInactiveButton}
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onClick={() => PostRegister(Number(formState.matricula), formState.nome, formState.funcao, formState.email, formState.senha,  formState.resolutor, Number(formState.setor_idSetor), Number(formState.filial_idFilial))}
				>
					<img
						src={RegisterIcon}
						alt="ícone de cadastro"
					/>
          Cadastrar
				</RegisterButton>
			</RegisterContainer>
		</>
	);
};