import { MyResponsiveBar } from "../../core-ui/data-visualizers/bar-chart";
import { MyResponsivePie } from "../../core-ui/data-visualizers/pie-chart";
import pieData from "../../core-ui/data-visualizers/pie-chart/data";
import barData from "../../core-ui/data-visualizers/bar-chart/data";

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col pl-10 w-screen pr-16">
          {/* <Navbar2 /> */}
          <div className="pt-10">
            <h1 className="text-3xl font-bold">Hi, Welcome Back</h1>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row mt-5 flex-col">
        <div className="flex-1 overflow-x-auto md:ml-2">
          <MyResponsiveBar data={barData} />
        </div>
        <div className="flex-1  overflow-x-auto md:-ml-12">
          <MyResponsivePie data={pieData} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
