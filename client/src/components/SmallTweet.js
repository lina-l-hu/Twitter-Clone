import { FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import TweetActionBar from "./TweetActions/TweetActionBar";
import Avatar from "./Avatar";
import { PADDING } from "../constants";
import moment from 'moment';
import { COLORS } from "../constants";


const SmallTweet = ( { isRetweetedPost, retweeterHandle, retweeterAuthor, avatarSrc,
    authorHandle, authorName, status, date, mediaSrc } ) => {

    const tweetDate = moment(date);
    const formattedDate = tweetDate.format("MMM Do");     

    return (
        <Wrapper>
            {(isRetweetedPost && 
            <RetweetedBar>
                <FiRepeat />
                <RetweetedFrom>{retweeterAuthor} Remeowed</RetweetedFrom>
            </RetweetedBar>
            )}
            <TweetWrapper>
                <Avatar imgSrc={avatarSrc}></Avatar>
                <Main>
                    <Header>
                        <UserName>{authorName}</UserName>
                        <UserHandle>@{authorHandle}</UserHandle>
                        <Date>•  {formattedDate}</Date>
                    </Header>
                    <Content>
                        <Status>{status}</Status>
                        <MediaContent src={mediaSrc}></MediaContent>
                    </Content>
                    <TweetActionBar />
                </Main>
            </TweetWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* margin: 10px 0; */
    padding: ${PADDING};
    border: 1px solid ${COLORS.outlineColor};
    border-top: none;
`;

const RetweetedBar = styled.div`
    display: flex;
    margin: 10px;
    margin-left: 30px;
    font-size: 20px;
    color: gray;
`;

const RetweetedFrom = styled.h6`
    margin-left: 5px;
    font-weight: 600;
`;

const TweetWrapper = styled.div`
    display: flex;
    width: 100%;
`

const Main = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: flex-start; */
    padding: 0 15px;
    width: 100%;
    
`;

const Header = styled.div`
    display: inline-block;
    vertical-align: baseline;
`;

const UserName = styled.span`
    font-weight: bold;
    font-size: 16px;
    margin-right: 10px;
`;

const UserHandle = styled.span`
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
    color: gray;
`;

const Date = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: gray;
`;

const Content = styled.div`
`;

const Status = styled.p`
    font-size: 18px;
    font-weight: 500;
    margin: 12px 0;
`;

const MediaContent = styled.img`
    width: 100%;
    border-radius: 20px;
`;

export default SmallTweet;