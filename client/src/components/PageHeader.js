import styled from "styled-components";
import { COLORS } from "../constants";

const PageHeader = ({children}) => {
    return (
        <PageTitle><h1>{children}</h1></PageTitle>
    )
}

const PageTitle = styled.div`
    padding: 10px;
    padding-left: 20px;
    border: 1px solid ${COLORS.outlineColor};
    width: 100%;
`

export default PageHeader;