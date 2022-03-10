import { Link } from "react-router-dom";
import { FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import TweetActionBar from "./TweetActions/TweetActionBar";
import Avatar from "./Avatar";
import { PADDING, COLORS } from "../constants";
import moment from 'moment';


const BigTweet = ( { tweetId, isRetweetedPost, retweeterHandle, retweeterAuthor, avatarSrc,
    authorHandle, authorName, status, date, mediaSrc, numLikes, numRetweets, isLiked, isRetweeted} ) => {
    
    const postTime = moment(date).format("h:mm A");
    const postDate = moment(date).format("MMM DD YYYY");

    return (
        <Wrapper>
            {(isRetweetedPost && 
            <RetweetedBar>
                <FiRepeat />
                <RetweetedFrom>{retweeterAuthor} Remeowed</RetweetedFrom>
            </RetweetedBar>
            )}

            <Header>
                <Avatar imgSrc={avatarSrc}></Avatar>
                <div>
                    <ProfileLink to={`/${authorHandle}`}>{authorName}</ProfileLink>
                    <UserHandle>@{authorHandle}</UserHandle>
                </div>
            </Header>

            <TweetWrapper>
                <Content>
                    <Status>{status}</Status>
                    <MediaContent src={mediaSrc}></MediaContent>
                </Content>
                <Date>{postTime} • {postDate} • Critter web app</Date>
            </TweetWrapper>
            <TweetActionBar numLikes={numLikes} numRetweets={numRetweets} 
                isLiked={isLiked} isRetweeted={isRetweeted} tweetId={tweetId}/>
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
    width: 100%;
`;

const RetweetedBar = styled.div`
    display: flex;
    margin: 10px;
    margin-left: 30px;
    font-size: 20px;
    color: ${COLORS.lightText};
`;

const RetweetedFrom = styled.h6`
    margin-left: 5px;
    font-weight: 600;
`;

const TweetWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;

    div {
        display: flex;
        flex-direction: column;
        padding: ${PADDING};
    }

`;

const ProfileLink = styled(Link)`
    font-weight: bold;
    font-size: 18px;
    text-decoration: none; 
    margin-right: 6px;

    &:hover {
        text-decoration: underline;
    }

    &:visited {
        color: black;
    }
`;

const UserHandle = styled.span`
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
    color: ${COLORS.lightText};
`;

const Date = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${COLORS.lightText};
    margin: 8px 0;
`;

const Content = styled.div`
    width: 100%;
`;

const Status = styled.p`
    font-size: 22px;
    font-weight: 500;
    margin: 12px 0;
`;

const MediaContent = styled.img`
    width: 100%;
    border-radius: 20px;
`;

export default BigTweet;