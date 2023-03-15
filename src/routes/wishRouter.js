import express from "express";
import { wishService } from "../services";
import jwt from "jsonwebtoken";

const wishRouter = express.Router;

// 마이페이지에서 사용자가 찜 목록 접근시
wishRouter.get("/wish", isUser(), async (req, res, next) => {
  try {
    // 사용자의 id 확인
    const user_id = req.user_id;

    // 사용자의 id를 기준으로 찜목록을 검색하는 서비스로 전달
    const wishList = await wishService.findWishList({ user_id });

    // 검색한 사용자의 찜 목록을 반환
    res.status(200).json(wishList);
  } catch (err) {
    next(err);
  }
});

// 지하철 역 정보 페이지에 접근할때
// 특정 지하철역의 찜 목록을 조회하여 갯수를 헤아리고,
// 로그인 상태의 사용자라면 해당 사용자의 찜 wish_id를 반환해준다(찜 버튼에 저장)
wishRouter.get("/wish/:station_id", async (req, res, next) => {
  try {
    // 파라미터 값 확인
    const station_id = req.params;
    if (station_id === ":station_id") {
      console.error("req.params에 station_id가 없음");
      throw new Error("req.params가 없습니다.");
    }

    // 로그인 유무에 따라 서비스 로직에 넘겨주는 데이터를 변화
    // 1. 로그인 상태 (cookies)
    if (req.signedCookies.token) {
      // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // const user_id = decoded.user_id;

      const user_id = jwt.verify(
        req.signedCookies.token,
        process.env.JWT_SECRET_KEY,
      ).user_id;

      let { stationWishCount, wish_id } =
        await wishService.findStationWishCountWithWishId({
          station_id,
          user_id,
        });

      res.status(200).json({ stationWishCount, wish_id });
      // 비로그인 상태 -> 역 찜 목록의 전체 갯수 반환
    } else {
      let stationWishCount = await wishService.findStationWishCount(station_id);

      res.status(200).json(stationWishCount);
    }

    res.status(200).json(stationWishCount);
  } catch (err) {
    next(err);
  }
});

// 지하철 역 정보 페이지에서 찜 추가 버튼 클릭시
wishRouter.post("/wish/:station_id", isUser(), async (req, res, next) => {
  try {
    // 파라미터 값 확인
    const station_id = req.params;
    if (station_id === ":station_id") {
      console.error("req.params에 station_id가 없음");
      throw new Error("req.params가 없습니다.");
    }

    // 사용자 id 값 확인
    const user_id = req.user_id;

    // 찜 생성 서비스로 id 전달
    const newWish = await wishService.createWish({ user_id, station_id });

    res.status(200).json(newWish);
  } catch (err) {
    next(err);
  }
});

// 찜 제거, 취소 (마이페이지)
wishRouter.delete("/wish/:wish_id", isUser(), async (req, res, next) => {
  try {
    const wish_id = req.params;
    if (wish_id === ":wish_id") {
      console.error("req.params에 wish_id가 없음");
      throw new Error("req.params가 없습니다.");
    }

    // id 값을 기준 찜 제거 서비스로 전달
    await wishService.deleteWish(wish_id);

    res.status(200).end();
  } catch (err) {}
});

// 찜 제거, 취소 (지하철 역 정보 페이지)
wishRouter.delete("/wish/:station_id", isUser(), async (req, res, next) => {
  try {
    const station_id = req.params;
    if (station_id === ":station_id") {
      console.error("req.params에 station_id가 없음");
      throw new Error("req.params가 없습니다.");
    }

    // id 값을 기준 찜 제거 서비스로 전달
    await wishService.deleteWish(station_id);

    res.status(200).end();
  } catch (err) {}
});

export { wishRouter };
