import React from "react";
import DataCard from ".";
import { render, fireEvent } from "@testing-library/react";
import { ToastProvider } from "@chakra-ui/react";

jest.mock("../../hooks/process", () => ({
    useProcess: jest.fn(() => ({
        process: {
            court: "Tribunal de Justiça do Estado de São Paulo",
            jurisdiction: "Comarca de São Paulo",
            date: "2022-01-01",
            subject: ["Indenização por Dano Moral", "Indenização por Dano Material"],
            judgeBody: "Desembargador da 17ª Câmara de Direito Privado",
        },
        showError: false,
        handleProcess: () => true,
    })),
    useRouter: jest.fn(() => ({
        router: {
            query: {id: '433349320-3948-988'}
        }
    }))
}));

describe("DataCard component", () => {
    it("renders the component", () => {
        const { getByText } = render(<DataCard />);
        const aboutTab = getByText("Sobre");
        const participantsTab = getByText('Participantes');

        expect(aboutTab).toBeInTheDocument();
        expect(aboutTab.style.color == "#000000");
        
        expect(participantsTab).toBeInTheDocument();
        expect(participantsTab.style.color == "#494949");
    });
});
