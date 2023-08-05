import { ResponsiveBar } from "@nivo/bar";

export const MyResponsiveBar = ({ data }: { data: any }) => {
  return (
    <div className="min-w-full h-[20rem] w-[30rem] md:h-[26rem] md:w-[42rem]">
      <ResponsiveBar
        data={data}
        keys={["degress"]}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        colors="#3182CE"
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "degrees",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};
