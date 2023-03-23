import express from "express";
import jwt from "jsonwebtoken";
import { isUser } from "../middlewares";
import { wishService } from "../services";
const wishRouter = express.Router();

// 마이페이지에서 사용자가 찜 목록 접근시 /wish/mypage
wishRouter.get("/mypage", isUser, async (req, res, next) => {
  try {
    // 사용자의 id를 기준으로 찜목록을 검색하는 서비스로 전달
    const wishList = await wishService.findWishList(req.user_id);

    // 검색한 사용자의 찜 목록을 반환
    res.status(200).json(wishList);
  } catch (err) {
    next(err);
  }
});

// 지하철 역 정보 페이지에 접근할때 /wish/stationpage/:station_id
// 특정 지하철역의 찜 목록을 조회하여 갯수,
// 로그인 상태의 사용자라면 해당 사용자의 찜 wish_id 반환
wishRouter.get("/stationpage/:station_id", async (req, res, next) => {
  try {
    // 파라미터 값
    const stationId = req.params.station_id;

    // 로그인 유무에 따라 서비스 로직에 넘겨주는 데이터를 변화
    // 1. 로그인 상태 (cookies)
    if (req.signedCookies.token) {
      const userId = jwt.verify(
        req.signedCookies.token,
        process.env.JWT_SECRET_KEY,
      ).user_id;

      const { stationWishCount, wish_id } =
        await wishService.findStationWishCountWithWishId({
          station_id: stationId,
          user_id: userId,
        });

      res.status(200).json({ stationWishCount, wish_id });
    } else {
      // 비로그인 상태 -> 역 찜 목록의 전체 갯수 반환
      const stationWishCount = await wishService.findStationWishCount(
        stationId,
      );

      res.status(200).json(stationWishCount);
    }
  } catch (err) {
    next(err);
  }
});

// 지하철 역 정보 페이지에서 찜 추가 버튼 클릭시
wishRouter.post("/:station_id", isUser, async (req, res, next) => {
  try {
    const stationId = req.params.station_id;

    // 사용자 id 값 확인
    const userId = req.user_id;

    // 찜 생성 서비스로 id 전달
    const result = await wishService.createWish({ userId, stationId });
    const newWish = await wishService.findWish({
      user_id: userId,
      station_id: stationId,
    });

    res.status(200).json({
      message: result,
      newWish: newWish,
    });
  } catch (err) {
    next(err);
  }
});

// 찜 제거, 취소 (마이페이지)
wishRouter.delete("/user/:wish_id", isUser, async (req, res, next) => {
  try {
    const wishId = req.params.wish_id;

    // id 값 기준, 찜 제거 서비스로 전달
    const deleteMessage = await wishService.deleteWish(wishId);

    res.status(200).json({
      message: deleteMessage,
    });
  } catch (err) {
    next(err);
  }
});

// 찜 제거, 취소 (지하철 역 정보 페이지)
wishRouter.delete("/station/:station_id", isUser, async (req, res, next) => {
  try {
    const stationId = req.params.station_id;
    const userId = req.user_id;

    // id 값을 기준 찜 제거 서비스로 전달
    const deleteMessage = await wishService.deleteStationWish({
      station_id: stationId,
      user_id: userId,
    });

    res.status(200).json({
      message: deleteMessage,
    });
  } catch (err) {
    next(err);
  }
});

export { wishRouter };
