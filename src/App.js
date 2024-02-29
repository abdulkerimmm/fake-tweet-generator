import React, { useEffect, useRef, useState } from "react";
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  VerifiedIcon,
  ShareIcon,
  BookMark,
} from "./icons";
import { useScreenshot } from "use-react-screenshot";

function App() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [views, setViews] = useState(0);
  const [reply, setReply] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [bookmark, setBookmark] = useState(0);
  const [image, takeScreenshot] = useScreenshot();
  const [share, setShare] = useState(0);
  const ref = useRef();
  const downloadRef = useRef();

  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  const tweetFormat = (tweet) => {
    tweet = tweet
      .replace(/@([\w]+)/g, "<span>@$1</span>")
      .replace(/#([\wşçöğüıİ]+)/gi, "<span>#$1</span>")
      .replace(/(https?:\/\/[\w\.\/]+)/, "<span>$1</span>")
      .replace(/\n/g, "<br />");
    return tweet;
  };

  const formatNumber = (number) => {
    if (!number) {
      number = 0;
    }
    if (number < 1000) {
      return number;
    }
    number /= 1000;
    number = String(number).split(".");

    return (
      number[0] + (number[1] > 100 ? "," + number[1].slice(0, 1) + " B" : " B")
    );
  };

  const getImage = () => takeScreenshot(ref.current);

  return (
    <>
      <div className="settings">
        <h3>Tweet Settings</h3>
        <ul>
          <li>
            <label>Name surname</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>User Name</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>Tweet</label>
            <input
              className="input"
              type="textarea"
              maxLength="290"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>Avatar</label>
            <input type="file" className="input" onChange={avatarHandle} />
          </li>
          <li>
            <label>Reply</label>
            <input
              type="number"
              className="input"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>Reply</label>
            <input
              type="number"
              className="input"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>Retweet</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>Like</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>BookMark Tweets</label>
            <input
              type="number"
              className="input"
              value={bookmark}
              onChange={(e) => setBookmark(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>Share Tweets</label>
            <input
              type="number"
              className="input"
              value={share}
              onChange={(e) => setShare(e.target.value)}
            />{" "}
          </li>
          <li>
            <label>Verified</label>
            <select
              onChange={(e) => setIsVerified(e.target.value)}
              defaultValue={isVerified}
            >
              <option value="1">Evet</option>
              <option value="0">Hayır</option>
            </select>
          </li>
          <li>
            <a href={image} download="tweet.png">
              <button onClick={getImage}>Oluştur</button>
            </a>
          </li>
        </ul>
      </div>

      <div ref={ref} className="tweet">
        <div className="header">
          <img src={avatar || "logo512.png"} />
          <div className="userinfo">
            <span>
              {name || "name"}
              {isVerified == 1 && (
                <span>
                  <VerifiedIcon height={15} />
                </span>
              )}
            </span>

            <span className="span2"> @{username || "userName"} </span>
          </div>
        </div>
        <div className="content">
          <p
            dangerouslySetInnerHTML={{
              __html:
                (tweet && tweetFormat(tweet)) || "Bu alana örnek tweet gelecek",
            }}
          />
        </div>
        <div className="info">
          <div>9:57 PM·Feb 15, 2024</div>
          <div>
            · <b style={{ color: "#fff" }}>{formatNumber(views) || "13"}k</b>{" "}
            Views
          </div>
        </div>
        <div className="actions">
          <div>
            {<ReplyIcon />}{" "}
            <span style={{ marginLeft: "5px" }}>{formatNumber(reply)}</span>
          </div>
          <div>
            {<RetweetIcon />}{" "}
            <span style={{ marginLeft: "5px" }}>{formatNumber(retweets)}</span>
          </div>
          <div>
            {<LikeIcon />}{" "}
            <span style={{ marginLeft: "5px" }}>{formatNumber(likes)}</span>
          </div>
          <div>
            {<BookMark />}{" "}
            <span style={{ marginLeft: "5px" }}>{formatNumber(bookmark)}</span>
          </div>
          <div>
            {<ShareIcon />}{" "}
            <span style={{ marginLeft: "5px" }}>{formatNumber(share)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
