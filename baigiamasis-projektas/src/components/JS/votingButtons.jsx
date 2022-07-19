import styled from '@emotion/styled'

const Button = styled.button`
    width: 50px;
    text-align: center;
    background: none;
    border: none;
    display: block;
    padding: 0;
    font-size: 2em;
    cursor: pointer;
    color: ${props => props.active ? 'rgb(28, 173, 209)' : 'antiquewhite'};
    &:hover{
        color: green;
    }
    &:disabled{
        cursor: not-allowed;
    }
`;

const VotingBUttons = (props) => {
    return (<>
        <Button active={props.currentVote === 1}
            disabled={props.currentVote === 1}
        >&#9650;</Button>
        <div style={{ textAlign: 'center', width: '50px' }}>{props.votes}</div>
        <Button
            active={props.currentVote === -1}
            disabled={props.currentVote === -1}
        >&#9660;</Button>
    </>);
}

export default VotingBUttons;