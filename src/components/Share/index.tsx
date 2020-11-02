import React,{FC,memo,useState} from 'react';

import Link from '@material-ui/core/Link';

import Twitter from '@material-ui/icons/Twitter';
import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';

interface Props {
    content:string;
}

const Share:FC<Props>=memo(({content})=>{

    const twitterShareLink=(content:string):string=>`https://twitter.com/intent/tweet?text={content}`;
    const facebookShareLink=(content:string):string=>'https://www.facebook.com/sharer/sharer.php?u=http://baobao.pink&display=popup&ref=plugin&src=like&kid_directed_site=0';    
    const instagramShareLink=(content:string):string=>'https://www.linkedin.com/cws/share?url=http://baobao.pink';

    return (
        <div>
            <Link href={twitterShareLink(content)}>
                <Twitter />
            </Link>
            <Link href={facebookShareLink(content)}>
                <Facebook />
            </Link>
            <Link href={instagramShareLink(content)}>
                <Instagram />
            </Link>
        </div>
    );
})

export default Share;