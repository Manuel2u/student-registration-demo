import { ResponsivePie } from "@nivo/pie";

export const MyResponsivePie = ({ data }: any) => {
  return (
    <>
      <div className="min-w-full w-[22rem] h-[20rem] md:h-[26rem] md:w-[32rem]">
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          colors={["#66b5f5", "#5792bc", "#5ea4d9", "#4a6c82"]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 5,
              itemWidth: 85,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};
