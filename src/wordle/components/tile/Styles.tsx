// Styled components
import styled from "styled-components";

interface FlippedCardProps {
    backgroundColor?: string
    color?: string
    borderColor?: string
    borderWidth?: number

}

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16;
    font-weight: bolder;
    font-size: x-large;
`;
export const FlipCardFront = styled(CardFace)<FlippedCardProps>`
    background-color: ${props => props.backgroundColor};
    ${props => props.color};`;



export const FlipCardBack = styled(CardFace)<FlippedCardProps>`
    background-color: ${props => props.backgroundColor};
    color: #ffff;
    transform: rotateY(180deg);
`;

// Define an interface for the props
interface FlipCardInnerProps {
    flipped: boolean;
}


export const FlipCardInner = styled.div<FlipCardInnerProps>`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    transform: ${props => props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

export const ResultColor = {
    light: {
        correct: '#6AAA64',
        close: '#C9B458',
        wrong: "#787C7E",
        default: "#FFFFFF"
    },
    dark: {
        correct: "#538D4E",
        close: "#B59F3B",
        wrong: "#3A3A3C",
        default: "#121213"
    }

}