import { ButtonNew } from "../../Components/Home/ButtonNew";
import { IssueMobile } from "../../Components/Home/CalledMobile";
import { HeaderMobile } from "../../Components/Home/HeaderMobile";
import { NavigationBar } from "../../Components/MenuNavegation";
import {
	BoxEmptyContainer,
	ButtonWrapper,
	HomeContent,
	MainMobile,
	Overflowdiv,
	ScreenContainer,
} from "./styles";
import { BoxEmpty } from "../../Components/BoxEmpty";
import { useEffect, useState } from "react";
import { api } from "../../Services";
import { LoadingScreen } from "../../Components/LoadingScreen";

export interface HomeProps {
	idChamado: string;
	descricao: string;
	dataRelato: string;
	status: string;
	horarioUltimaAtualizacao: boolean;
}

export const Home = () => {
	const [listaChamados, setListaChamados] = useState<HomeProps[]>();
	const [isLoading, setIsLoading] = useState(false);

	const usuarioLogado = JSON.parse(localStorage.getItem("userData") ?? "null");
	function verificarLogin() {
		if (!usuarioLogado) {
			window.location.replace("/login");
		}
	}

	verificarLogin();

	useEffect(() => {
		setIsLoading(true);
		api
			.get(`/ConsultaChamado/${usuarioLogado.matricula}`, {
				headers: { Authorization: `Bearer ${usuarioLogado.token}` },
			})
			.then((response) => setListaChamados(response.data))
			.catch((err) => {
				console.error(`ops! ocorreu um erro ${err}`);
			})
			.finally(() => setIsLoading(false));
	}, [usuarioLogado.matricula, usuarioLogado.token]);

	const issuesNumber = listaChamados?.length;

	return (
		<ScreenContainer>
			<MainMobile>
				<HeaderMobile
					userName={usuarioLogado ? usuarioLogado.nome : ""}
					pageTittle="Meus chamados"
					issueQuantify={issuesNumber}
				/>
				{isLoading ? (
					<LoadingScreen />
				) : (
					<Overflowdiv>
						<HomeContent>
							{listaChamados ? (
								listaChamados.map((issue) => {
									return (
										<IssueMobile
											key={issue.idChamado}
											id={issue.idChamado}
											description={issue.descricao}
											date={issue.dataRelato}
											status={issue.status}
											isUpdated={issue.horarioUltimaAtualizacao}
										/>
									);
								})
							) : (
								<BoxEmptyContainer>
									<BoxEmpty
										alt="caixa vazia"
										title="Não há solicitações no momento."
										color="#494949"
									/>
								</BoxEmptyContainer>
							)}
						</HomeContent>
						<ButtonWrapper>
							{issuesNumber ? issuesNumber < 4 ? <ButtonNew /> : null : null}
						</ButtonWrapper>
					</Overflowdiv>
				)}
			</MainMobile>
			<NavigationBar />
		</ScreenContainer>
	);
};
