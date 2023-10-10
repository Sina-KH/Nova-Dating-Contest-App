import UserGetTokenEnd from '@/endpoints/user/getTokenEnd';
import ProfileEditEnd from '@/endpoints/profile/editEnd';
import ProfileSetGenderEnd from '@/endpoints/profile/setGenderEnd';
import ProfileSetInterestsEnd from '@/endpoints/profile/setInterestsEnd';
import ProfileSetSearchFiltersEnd from '@/endpoints/profile/setSearchFiltersEnd';
import ReactionLikeEnd from '@/endpoints/reaction/likeEnd';
import ReactionDislikeEnd from '@/endpoints/reaction/dislikeEnd';
import FileGetEnd from '@/endpoints/file/getEnd';
import HookTelegramEnd from '@/endpoints/hook/telegramEnd';
import MatchListEnd from '@/endpoints/match/listEnd';
import MatchRequestLinkEnd from '@/endpoints/match/requestLinkEnd';
import TagListEnd from '@/endpoints/tag/listEnd';
import ExploreUsersEnd from '@/endpoints/explore/usersEnd';

const Ends = [
    UserGetTokenEnd,
    ProfileEditEnd,
    ProfileSetGenderEnd,
    ProfileSetInterestsEnd,
    ProfileSetSearchFiltersEnd,
    ReactionLikeEnd,
    ReactionDislikeEnd,
    FileGetEnd,
    HookTelegramEnd,
    MatchListEnd,
    MatchRequestLinkEnd,
    TagListEnd,
    ExploreUsersEnd
];

export default Ends;
