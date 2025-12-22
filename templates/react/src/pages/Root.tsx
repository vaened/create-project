/**
 * @author enea dhack <contact@vaened.dev>
 * @link https://vaened.dev DevFolio
 */

import React from "react";
import { Outlet } from "react-router-dom";

export interface RootLayoutProps {}

export const Root: React.FC<RootLayoutProps> = () => {
  return <Outlet />;
};

export default Root;
