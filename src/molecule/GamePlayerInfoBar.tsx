import Circle from "@/atom/Circle"
import Spacer from "@/atom/Spacer"

import {useRecoilValue} from "recoil";

import {currentGameScore} from "@/states/game/currentGameScore";
import {matchInfo} from "@/states/game/matchInfo";

const GamePlayerInfoBar = () => {

	const gameScore = useRecoilValue(currentGameScore);
	const playerInfo = useRecoilValue(matchInfo);

	const lPlayerProfileImg = playerInfo?.lPlayerInfo.prof_img;
	const rPlayerProfileImg = playerInfo?.rPlayerInfo.prof_img;

	if (!playerInfo) {
		return null;
	}
	return (
		<>
		<div className="flex flex-row bg-neutral-800 font-pixel text-white">
			<div className="flex my-6 ml-6">
				<img className={`shrink-0 w-14 h-14 rounded-full`}
						 src={lPlayerProfileImg ? lPlayerProfileImg : "src/assets/default_profile_image.png"}
						 alt={"user profile"}
				/>
				<div className="flex flex-col ml-4 items-start justify-center">
				<span>{playerInfo.lPlayerInfo.nickname}</span>
				<span>{playerInfo.lPlayerInfo.mmr}</span>
				</div>
			</div>
			<Spacer />
			<div className="flex flex-col text-4xl whitespace-nowrap justify-center stop-dragging">
				{gameScore ? gameScore.p1Score : 0}   :   {gameScore ? gameScore.p2Score : 0}
			</div>
			<Spacer />
			<div className="flex my-6 mr-6 justify-center items-center">
				<div className="flex flex-col mr-4 items-end justify-center">
				<span>{playerInfo.rPlayerInfo.nickname}</span>
				<span>{playerInfo.rPlayerInfo.mmr}</span>
				</div>
				<img className={`shrink-0 w-14 h-14 rounded-full`}
						 src={rPlayerProfileImg ? rPlayerProfileImg : "src/assets/default_profile_image.png"}
						 alt={"user profile"}
				/>
			</div>
		</div>
		<div className="bg-white w-full h-4"></div>
		</>
	)
}

export default GamePlayerInfoBar