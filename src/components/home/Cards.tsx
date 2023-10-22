import TopicHeader from "./TopicHeader";

type CardType = {
  title : string,
  topic : {
    src : string
    topic: string
  }[]
}
export const Cards = ({ title, topic }: CardType) => {
  return (
    <div className="wrap flex flex-col">
      <TopicHeader title={title} />
      <div className="flex flex-row fle-wrap">
        {topic.map((items, index) => (
          <div
            key={index}
            className="flex w-full cursor-pointer hover:scale-101"
          >
            <div className="flex flex-col w-11/12 mx-auto relative text-center">
              <img src={items.src} alt="" />
              <h4 className="text-2xl text-white font-semibold absolute bottom-5 left-0 right-0 text-center">
                {items.topic}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cards;
