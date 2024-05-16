import React, { useEffect, useState } from "react";
import "./App.css";
import scroll from "./helpers/scroll";
import scrollToBottom from "./helpers/scroll";

const CheckMark = () => {
  return (
    <figure className="w-full h-full absolute flex justify-center items-center check">
      <section className="w-[50%] h-[50%] flex justify-center items-center bg-[#31333D]">
        <img src="/assets/icons/check.svg" className="w-[70%] h-[70%]" />
      </section>
    </figure>
  );
};

const FollowComponent = ({ joined, step, type, prompt, link }) => {
  return (
    <>
      {type == 1 && (
        <section className="w-full mb-[20px] mt-[10px] relative h-[93px] flex justify-center items-center">
          {/* Border image */}
          <img
            src="/assets/images/gradient_border.svg"
            className="w-full h-full absolute top-0 left-0"
          />

          <section className="flex justify-between items-center w-[95%] h-[65px]">
            <section className="flex justify-start items-center h-full">
              <figure className="w-[69px] h-full mr-[12px]">
                <img
                  src="/assets/icons/Group 33567.svg"
                  className="w-full h-full"
                />
              </figure>

              <section className="flex flex-col justify-center items-start">
                <span className="mb-[12px] text-[#D6D6D6] text-[18px]">
                  100,000 $LOOT
                </span>
                <p className="text-[#B2B5BB] text-[12px] font-[Aldrich] font-normal">
                  Pool reward
                </p>
              </section>
            </section>

            <section className="flex justify-start items-center mr-[5px]">
              <span className="text-[#B0B7C7] text-[14px]">Claim Pool</span>
              <figure className="w-[18px] h-[11px] ml-[5px]">
                <img
                  src="/assets/icons/Arrow - Right 3 (1).svg"
                  className="w-full h-full"
                />
              </figure>
            </section>
          </section>
        </section>
      )}

      {type == 2 && (
        <section
          className="flex flex-col justify-start items-start mb-[22px] w-full link-card"
          data-link={`${link}`}
        >
          <span className="mb-[20px] font-[Aldrich] font-normal">
            STEP {step}
          </span>

          <section className="w-full relative h-[93px] flex justify-center items-center">
            {/* Border image */}
            <img
              src="/assets/images/gradient_border.svg"
              className="w-full h-full absolute top-0 left-0"
            />

            <section className="flex justify-start items-center w-[95%] h-[65px]">
              <section className="flex justify-start items-center h-full">
                <figure className="w-[69px] h-full mr-[12px] relative">
                  {joined && <CheckMark />}
                  {step == 1 && (
                    <img
                      src="/assets/images/tiktok.svg"
                      className="w-full h-full"
                    />
                  )}

                  {step == 2 && (
                    <img
                      src="/assets/images/youtube.svg"
                      className="w-full h-full"
                    />
                  )}

                  {step == 3 && (
                    <img
                      src="/assets/images/onlyfans.svg"
                      className="w-full h-full"
                    />
                  )}
                </figure>

                <span>{prompt}</span>
              </section>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

const tele = window.Telegram.WebApp;
const App = () => {
  const [val, setVal] = useState(null);
  const [val2, setVal2] = useState(null);

  //Executes whenever query is changed
  useEffect(() => {
    tele.ready();
    tele.MainButton.show();
    tele.MainButton.text = "Start with tasks";
    tele.MainButton.color = "#F4AD00";
    tele.MainButton.textColor = "#fff";
    tele.expand();
    setVal(tele.initData);
    setVal2(tele.initDataUnsafe.user.id);

    // tele.initDataUnsafe.initData

    // Access the data sent from the bot
    // const receivedId = initData.telegram_id;
    console.log(tele);
    // let initData = tele.initData;
    // console.log(initData);
    // tele.sendData(
    //   JSON.stringify({ data: `Received user id: ${initData.telegram_id}` })
    // );
  }, []);

  const [youtubeJoined, setYoutubeJoined] = useState(false);
  const [tiktokJoined, setTiktokJoined] = useState(false);
  const [onlyfansJoined, setOnlyfansJoined] = useState(false);

  const handleLinks = () => {
    let links = document.querySelectorAll(".link-card");
    let lastLink = links[links.length - 1].getAttribute("data-link");

    if (!tiktokJoined) {
      tele.openLink(lastLink);
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setTiktokJoined(true);
        scrollToBottom();
        setTimeout(() => {
          scrollToBottom();
        }, [850]);
      }, 1300);
      return;
    }

    if (!youtubeJoined) {
      tele.openLink(lastLink);
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setYoutubeJoined(true);
        scrollToBottom();
        setTimeout(() => {
          scrollToBottom();
        }, [850]);
      }, 1300);
      return;
    }

    if (!onlyfansJoined) {
      tele.openLink(lastLink);
      setTimeout(() => {
        tele.MainButton.text = "Done! Proceed Forward";
        setOnlyfansJoined(true);
        scrollToBottom();
        setTimeout(() => {
          scrollToBottom();
        }, [850]);
      }, 1300);
      return;
    }
  };

  const handleClick = () => {
    const clickAnchor = document.getElementById("click");

    if (document.querySelectorAll(".check").length === 3) {
      tele.openLink("https://t.me/crypto");
      tele.close(); //close mini app
    } else {
      clickAnchor.setAttribute("disabled", "true");
      handleLinks();
    }
  };

  tele.MainButton.onClick(handleClick);

  return (
    // <main className="relative main font-medium bg-themeBlack w-[100vw] text-[#F2EFEF] max-w-[400px] min-w-[280px] min-h-screen pt-[30px] px-[15px] flex flex-col justify-start items-center">
    //   <a
    //     href="https://t.me/crypto"
    //     className="opacity-0 absolute z-[-5]"
    //     id="click"
    //   ></a>
    //   {/* Navbar */}
    //   <section className="flex justify-between items-center px-[5px] w-full">
    //     <figure className="flex justify-start items-center">
    //       {/* <img
    //         src="/assets/icons/nav_logo.svg"
    //         className="w-[30px] h-[30px] mr-[5px]"
    //       /> */}
    //       <img
    //         src="/assets/images/welcome.png"
    //         className="h-[24px] mr-[12px]"
    //       />
    //       <img src="/assets/icons/@Welcome.svg" className="h-[24px]" />
    //     </figure>

    //     <figure className="flex justify-start">
    //       <img
    //         src="/assets/icons/Notification.svg"
    //         className="w-[24px] h-[24px] mr-[22px] items-center"
    //       />
    //       <img src="/assets/icons/Group.svg" className="w-[24px] h-[24px]" />
    //     </figure>
    //   </section>

    //   {/* White Line */}
    //   <figure className="w-full h-[10px] mt-[20px]">
    //     <img src="/assets/icons/Navbar Line.svg" className="w-full h-full" />
    //   </figure>

    //   {/* Logo video loop */}

    //   <section className="overflow-hidden h-[180px] w-full rounded-[25px] bg-[black] my-[10px]">
    //     <video autoPlay loop muted playsInline className="w-[103%] h-[103%]">
    //       <source src="/assets/videos/logo.mp4" className="w-full h-full" />
    //     </video>
    //   </section>

    //   <FollowComponent type={1} />

    //   <span className="text-left text-[#F2EFEF] w-full block ml-[10px] text-[20px] mt-[20px]">
    //     Welcome to @Crypto
    //   </span>

    //   {/* White line */}
    //   <figure className="w-full h-[10px] my-[20px]">
    //     <img
    //       src="/assets/icons/Navbar Line (1).svg"
    //       className="w-full h-full"
    //     />
    //   </figure>

    //   <section className="flex justify-between items-start px-[5px] w-full h-[46px] mb-[10px]">
    //     {/* logo and text section */}
    //     <section className="flex justify-start items-center h-[46px]">
    //       <figure className="w-[46px] h-full flex justify-center items-center bg-[#31333D] rounded-[50px] mr-[10px]">
    //         <img
    //           src="/assets/images/crypto.png"
    //           className="w-[32px] h-[32px]"
    //         />
    //       </figure>

    //       <section className="flex flex-col justify-center items-start h-full">
    //         <section className="flex justify-start items-center mb-[4px]">
    //           <span className="font-normal">Crypto</span>
    //           <figure className="ml-[4px] w-[17px] h-[17px] flex justify-center items-center">
    //             <img src="/assets/images/badge.svg" className="w-full h-full" />
    //           </figure>
    //         </section>

    //         <span className="text-[15px] text-[#8698A9]">@Crypto</span>
    //       </section>
    //     </section>

    //     {/* Options btn section */}
    //     <section className="w-[24px] h-[24px] flex justify-evenly items-center">
    //       {/* <div className="bg-[#8698A9] rounded-[20px] w-[4px] h-[4px]"></div>
    //       <div className="bg-[#8698A9] rounded-[20px] w-[4px] h-[4px]"></div>
    //       <div className="bg-[#8698A9] rounded-[20px] w-[4px] h-[4px]"></div> */}
    //     </section>
    //   </section>

    //   <span className="block w-full text-left mt-[30px] mb-[40px] text-[20px]">
    //     Follow These Steps To Claim Reward
    //   </span>

    //   <FollowComponent
    //     type={2}
    //     step={1}
    //     prompt={"Follow to @Crypto Tiktok"}
    //     joined={tiktokJoined}
    //     link={"https://www.tiktok.com/@crypto"}
    //   />
    //   {tiktokJoined && (
    //     <FollowComponent
    //       type={2}
    //       step={2}
    //       prompt={"Subscribe to @Crypto YouTube"}
    //       joined={youtubeJoined}
    //       link={"https://www.youtube.com/crypto"}
    //     />
    //   )}
    //   {youtubeJoined && (
    //     <FollowComponent
    //       type={2}
    //       step={3}
    //       prompt={"Subscribe to @Crypto Onlyfans"}
    //       joined={onlyfansJoined}
    //       link={"https://onlyfans.com/crypto"}
    //     />
    //   )}
    // </main>
    <div className="w-full flex flex-col justify-center items-start">
      <div className="p-[20px] max-w-[300px] ml-[20px] text-[red] block mb-[30px]">{JSON.stringify(val)}</div>

      <div className="p-[20px] text-[red] max-w-[300px] ml-[20px] block">{JSON.stringify(val2)}</div>
    </div>
  );
};

export default App;
