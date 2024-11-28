import React from "react";
import {MapProps} from "@/types/Utils";

export function Map<T>({data, render}: MapProps<T>) {
    return (
        <>
            {data.map((item, index) => (
                <React.Fragment key={index}>
                    {render(item, index)}
                </React.Fragment>
            ))}
        </>
    );
}
