import { Link, useHistory } from "react-router-dom";
import { FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import TweetActionBar from "../TweetActions/TweetActionBar";
import Avatar from "./Avatar";
import { PADDING, COLORS } from "../../constants";
import ProfilePreview from "./ProfilePreview";
import moment from 'moment';
import CustomTippy from "./CustomTippy";

//component that displays a single tweet in small format on homefeed and profile pages
const SmallTweet = ( { tweetId, isRetweetedPost, retweeterAuthor, avatarSrc,
    authorHandle, authorName, status, date, mediaSrc, numLikes, numRetweets, isLiked, isRetweeted, bio, numFollowers, numFollowing } ) => {

    const formattedDate = moment(date).format("MMM Do");

    let history = useHistory();

    function handleClick() {
        history.push(`/tweet/${tweetId}`);
    }

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
                        <CustomTippy tabindex="-1" content={
                            <ProfilePreview avatarSrc={avatarSrc} authorName={authorName} 
                                authorHandle={authorHandle} bio={bio} 
                                numFollowers={numFollowers} numFollowing={numFollowing}
                                />} >
                                <ProfileLink to={`/${authorHandle}`}>{authorName}</ProfileLink>
                            </CustomTippy>
                        <HandleSpan>@{authorHandle} • {formattedDate}</HandleSpan>
                    </Header>

                    <Content onClick={handleClick} tabindex="0">
                        <Status>{status}</Status>
                        <MediaContent src={mediaSrc}></MediaContent>
                    </Content>

                    <TweetActionBar numLikes={numLikes} numRetweets={numRetweets}
                        isLiked={isLiked} isRetweeted={isRetweeted} tweetId={tweetId}/>
                </Main>

            </TweetWrapper>

        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${PADDING};
    border: 1px solid ${COLORS.outlineColor};
    width: 100%;
    
`;

const RetweetedBar = styled.div`
    display: flex;
    margin: 5px 10px 5px 30px;
    font-size: 20px;
    color: ${COLORS.lightText};
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
    padding: 0 15px;
    width: 100%;
    
`;

const Header = styled.div`
    display: inline-block;
    vertical-align: baseline;
`;

const ProfileLink = styled(Link)`
    text-decoration: none; 
    font-weight: bold;
    font-size: 16px;
    margin-right: 6px;

    &:hover {
        text-decoration: underline;
    }

    &:visited {
        color: black;
    }
`;

const HandleSpan = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${COLORS.lightText};
`;

const Content = styled.div`
    width: 100%;
    padding: inherit;
`;

const Status = styled.p`
    font-size: 18px;
    font-weight: 500;
    margin: 12px 0;
    word-wrap: break-word;
`;

const MediaContent = styled.img`
    width: 100%;
    border-radius: 20px;
`;

export default SmallTweet;