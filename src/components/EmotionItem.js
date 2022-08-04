const EmotionItem=({emotion_id,emotion_img,emotion_descript,onClick,isSelected})=>{
    const env=process.env;
    env.PUBLIC_URL=env.PUBLIC_URL || "";

    return (
    <div className={["EmotionItem",isSelected? `EmotionItem_on_${emotion_id}` : `Emotionitem_off`].join(" ")} onClick={()=>{onClick(emotion_id)}}>
        <img src={"../"+emotion_img}></img>
        <span>{emotion_descript}</span>
    </div>
    )
}

export default EmotionItem