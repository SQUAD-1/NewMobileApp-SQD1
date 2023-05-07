import { FooterButtons } from "../../../Components/FooterButtons";
import { InputLegend } from "../../../Components/FildestInput";
import { FildsetTextArea } from "../../../Components/FildsetTextArea";
import {
    AbrirChamadoContainer,
    HeaderComponent,
    InfoChamadosContainer,
} from "./styles";

import { SelectOption } from "../../../Components/SelectOption";
import { BackButton } from "../../../Components/BackButton";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../../Components/MenuNavegation";
import typeCall from "../../../mocks/typeCall";

export const AbrirChamado = () => {
    return (
        <AbrirChamadoContainer>
            <Link to="/">
                <BackButton actionText="voltar" />
            </Link>
            <HeaderComponent>
                <h1>O que aconteceu?</h1>
            </HeaderComponent>
            <InfoChamadosContainer>
                <FildsetTextArea
                    legendText="Resumo"
                    placeholder="Do que se trata o chamado?"
                    height="56px"
                    width="auto"
                />
                <SelectOption legendText="Tipo" height="56px" width="auto">
                    <option value="" disabled selected>
                        Qual o tipo do chamado?
                    </option>
                    {typeCall.map((item, index) => (
                        <option key={index} value={item.type}>
                            {item.type}
                        </option>
                    ))}
                </SelectOption>
                <FildsetTextArea
                    legendText="Descrição"
                    placeholder="Nos conte mais detalhes sobre o ocorrido..."
                    height="240px"
                    width="auto"
                />
                <InputLegend
                    legendText="Data do ocorrido"
                    placeholder="dd/mm/aaaa"
                    inputType="date"
                    height="56px"
                    width="auto"
                    maxLength={4}
                />
            </InfoChamadosContainer>
            <FooterButtons LastPage="/" NextPage="/Home" />
            <NavigationBar />
        </AbrirChamadoContainer>
    );
};
