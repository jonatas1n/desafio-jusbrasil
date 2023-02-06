import { render } from "@testing-library/react";
import { FaLandmark, FaCalendarAlt, FaBalanceScale, FaBuilding, FaFileAlt } from "react-icons/fa";
import ListData from ".";

jest.mock("../../hooks/process", () => ({
    useProcess: jest.fn(() => ({
        process: {
            court: 'Tribunal de Justiça do Estado de São Paulo',
            jurisdiction: 'Comarca de São Paulo',
            date: '2022-01-01',
            subject: ['Indenização por Dano Moral', 'Indenização por Dano Material'],
            judgeBody: 'Desembargador da 17ª Câmara de Direito Privado'
        },
        movement: [
            { data: '2022-01-02', description: 'Petição Recebida' },
            { data: '2022-01-03', description: 'Despacho do Juiz' }
        ]
    }))
}));

describe("ListData component", () => {
    it("should useProcess hook data render correctly", () => {
        const { getByText } = render(<ListData />);

        expect(getByText("Tribunal de Origem")).toBeInTheDocument();
        expect(getByText("Tribunal de Justiça do Estado de São Paulo")).toBeInTheDocument();
        expect(getByText("Comarca")).toBeInTheDocument();
        expect(getByText("Comarca de São Paulo")).toBeInTheDocument();
        expect(getByText("Início do Processo")).toBeInTheDocument();
        expect(getByText("2022-01-01")).toBeInTheDocument();
        expect(getByText("Última movimentação")).toBeInTheDocument();
        expect(getByText("2022-01-03")).toBeInTheDocument();
        expect(getByText("Assuntos")).toBeInTheDocument();
        expect(getByText("indenização por dano moral)")).toBeInTheDocument();
        expect(getByText("indenização por dano material)")).toBeInTheDocument();
        expect(getByText("Órgão Julgador")).toBeInTheDocument();
    })
})
