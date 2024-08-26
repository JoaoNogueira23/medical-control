import { useRef } from "react"
import HighChartsReact from 'highcharts-react-official'
import { Stack } from "@mui/material";

const ChartWrapper = (props: HighChartsReact.Props) => {
    const chartComponentRef = useRef<HighChartsReact.RefObject>(null);

    return(
        <Stack>
            <HighChartsReact
                ref={chartComponentRef}
                {...props}
            />
        </Stack>
    )
}

export default ChartWrapper;