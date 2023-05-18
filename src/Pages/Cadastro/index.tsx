import { Link } from "react-router-dom";
import { BackButton } from "../../Components/BackButton";
import {
	HeaderRegister,
	RegisterButton,
	RegisterContainer,
	TitleInputArea,
	FormInput,
	InputArea,
	PasswordText,
	RightImg,
} from "./styles";
import { SelectOption } from "../../Components/SelectOption";
import setores from "../../mocks/setores";
import { useState } from "react";
import axios from "axios";
import RegisterIcon from "./images/Register.png";
import { LoadingScreen } from "../../Components/LoadingScreen";
import EyeIcon from "../Login/svg/eye.svg";
import EyeClosedIcon from "../Login/svg/eyeClosed.svg";
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

	function PostRegister(
		formMatricula: number,
		formNome: string,
		formFuncao: string,
		formEmail: string,
		formSenha: string,
		formResolutor: number,
		formSetorIdSetor: number,
		formFilialIdFilial: number
	) {
		const matricula = formMatricula;
		const nome = formNome;
		const funcao = formFuncao;
		const email = formEmail;
		const senha = formSenha;
		const resolutor = formResolutor;
		const setor_idSetor = formSetorIdSetor;
		const filial_idFilial = formFilialIdFilial;

		axios
			.post("https://fc-services-server.onrender.com/CadastrarUsuario", {
			.post("https://fc-services-server.onrender.com/CadastrarUsuario", {
				matricula,
				nome,
				funcao,
				email,
				senha,
				resolutor,
				setor_idSetor,
				filial_idFilial,
			})
			.then(() => {
				window.location.href = "/Login";
				setIsLoading(true);
			})

			.catch(() => {
				setIsLoading(true);
			})

			.finally(() => {
				setIsLoading(false);
			});
	}

	const [passwordVisible, setPasswordVisible] = useState(false);

	// const validEmail = /[a-zA-Z0-9._]+@[a-z0-9]+\.[a-z.]{2,}$/;
	return (
		<>
			{isLoading === true ? <LoadingScreen /> : undefined}
			<RegisterContainer>
				<Link to="/login">
					<BackButton
						actionText={"Login"}
						color="#AA0E27"
						fontWeight={"500"}
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
						onChange={(e) => {
							setFormState({
								...formState,
								matricula: e.target?.value,
							});
						}}
						placeholder="Ex: 99999"
						border="1px solid #49454f"
						width="auto"
					/>
					<InputLegend
						legendText="Nome"
						maxLength={80}
						inputType="text"
						onChange={(e) => {
							setFormState({
								...formState,
								nome: e.target?.value,
							});
						}}
						placeholder="Ex: João de Barros"
						border="1px solid #49454f"
						width="auto"
					/>
					<TitleInputArea>Qual sua filial?</TitleInputArea>
					<SelectOption
						onChange={(e) => {
							setFormState({
								...formState,
								filial_idFilial: Number(e.target?.value),
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
							setor_idSetor: Number(e.target?.value),
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
					onChange={(e) => {
						setFormState({
							...formState,
							funcao: e.target?.value,
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
					<option value="System Analytics1">System Analytics</option>
					<option value="Software Engineer">Software Engineer</option>
					<option value="Prompt Engineer">Prompt Engineer</option>
					<option value="Head of Technology">Head of Technology</option>
					<option value="Cientista de Dados">Cientista de Dados</option>
					<option value="Vendedor">Vendedor</option>
					<option value="Analista de inovação">Analista de inovação</option>
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
						height="56px"
						pattern="[a-zA-Z0-9._]+@[a-z0-9]+\.[a-z.]{2,}$"
					/>              
				</InputArea>
       
				<InputArea>
					<Legend>
						<LegendText>{"Senha"}</LegendText>
					</Legend>
					<FormInput
						type={passwordVisible ? "text" : "password"}
						onChange={(e) => {
							setFormState({
								...formState,
								senha: e.target?.value,
							});
						}}
						placeholder="Digite sua senha"
						height="56px"
						required  
					/>	
					{formState.senha.length < 8 && formState.senha.length > 1 && (
						<PasswordText>
										Senha deve ter no mínimo 8 caracteres
						</PasswordText>
					)}
					<RightImg
						src={passwordVisible ? EyeClosedIcon : EyeIcon}
						alt="Hide password"
						onClick={() => {
							setPasswordVisible(!passwordVisible);
						}}
					/>
				</InputArea>
				<RegisterButton
					type="submit"
					onClick={() =>
						PostRegister(
							Number(formState.matricula),
							formState.nome,
							formState.funcao,
							formState.email,
							formState.senha,
							formState.resolutor,
							Number(formState.setor_idSetor),
							Number(formState.filial_idFilial)
						)
					}>
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
