"use client";
import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
  
} from 'react-share';
// import Head from "next/head";

const Share = ({ title, keywords, description, postDesc, image ,id }) => {
  // console.log("meta image", description)
  const shareUrl = 'https://blog.ufuon.com/article';


  return (
    <ul className="article-share">
       <p>Share</p>
          <li>
              <FacebookShareButton
              url={shareUrl+'/'+id}
                quote={title +' ' + postDesc }
                hashtag={title }  >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
          </li>
          <li>
              <WhatsappShareButton
              url={shareUrl+'/'+id}
                quote={title +' ' + postDesc }
              hashtag={title } >
                <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
          </li>
          <li>
              <TwitterShareButton
              url={shareUrl+'/'+id}
              quote={title +' ' + postDesc }
                title={title +' ' + postDesc }
                via={title }
                hashtag={title} >
                <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
          </li>
          <li>
            <TelegramShareButton
            url={shareUrl+'/'+id}
            quote={title +' ' + postDesc }
                hashtag={title }>
            <TelegramIcon size={40} round={true} />
            </TelegramShareButton>
          </li>
            <li>
              <LinkedinShareButton
               url={shareUrl+'/'+id}
              quote={title +' ' + postDesc }
                  summary={title  +' ' + postDesc }
                  hashtag={title}>
              <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>
            </li>
              <li>
                <EmailShareButton
                  url={shareUrl+'/'+id}
                   quote={title +' ' + postDesc }
                    hashtag={title }>
                <EmailIcon size={40} round={true} />
                </EmailShareButton>
              </li>
                        
           </ul>
  );
};





export default Share;
