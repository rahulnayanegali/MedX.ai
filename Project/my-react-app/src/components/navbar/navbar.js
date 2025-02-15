import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../img/Logo.png';
import Medexericon from "../img/icons/medex-w";

import { MdDashboard } from "react-icons/md";
import { TbReportMedical } from "react-icons/tb";
//import { IoMdPerson } from "react-icons/io";

const Navbar = () => {// Access user from AuthContext

    const [isDashboardActive, setIsDashboardActive] = useState(true);
    const [isMedexerActive, setIsMedexerActive] = useState(false);
    const [isReportActive, setIsReportActive] = useState(false);
    //const [isUserActive, setIsUserActive] = useState(false);

    const activeClassName = 'text-white';
    const normalLink = 'text-customBasewhite-30';

    const iconactive = 'white';
    const icon = 'rgba(255, 255, 255, 0.3)';
    return (
        <div className="h-full w-fit p-5 bg-primary  flex-col justify-start items-start gap-2.5 inline-flex rounded-r-[10px]">
            <div className="self-stretch h-full flex-col justify-between items-center flex gap-9">
                <div className="flex-col justify-start items-center gap-2.5 flex">
                    <div className="w-[180px] h-[180px] justify-center items-center inline-flex">
                        <img className="" src={Logo} alt='' />
                    </div>
                </div>
                <div className="self-stretch grow shrink basis-0 flex-col justify-start items-center flex p-6 ">
                    <div className="self-stretch flex-col justify-between items-start flex gap-5">
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px]">
                                <MdDashboard className={`${isDashboardActive ? activeClassName : normalLink} w-[20px] h-[20px]`} />
                            </div>
                            <div>
                                <NavLink
                                    to="/"
                                    className={isDashboardActive ? activeClassName : normalLink}
                                    onClick={() => {
                                        setIsDashboardActive(true);
                                        setIsMedexerActive(false);
                                        setIsReportActive(false);
                                        //setIsUserActive(false);

                                    }}
                                >Dashboard</NavLink>
                            </div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] ">
                                <Medexericon fill={isMedexerActive ? iconactive : icon} />

                            </div>
                            <div>
                                <NavLink
                                    to="medexer"
                                    className={isMedexerActive ? activeClassName : normalLink}
                                    onClick={() => {
                                        setIsDashboardActive(false);
                                        setIsMedexerActive(true);
                                        setIsReportActive(false);
                                        //setIsUserActive(false);

                                    }}
                                >Medexer</NavLink>
                            </div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] ">
                                <TbReportMedical className={`${isReportActive ? activeClassName : normalLink} w-[20px] h-[20px]`} />

                            </div>
                            <div>
                                <NavLink
                                    to="/reportgall"
                                    className={isReportActive ? activeClassName : normalLink} onClick={() => {
                                        setIsDashboardActive(false);
                                        setIsMedexerActive(false);
                                        setIsReportActive(true);
                                        //setIsUserActive(false);

                                    }}
                                >Report</NavLink>
                            </div>
                        </div>


                      
                        {/* in the works for the future TBA
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] ">
                                <IoMdPerson className={`${isUserActive ? activeClassName : normalLink} w-[20px] h-[20px]`} />

                            </div>

                            <div>
                                <NavLink
                                    to="/profile"
                                    className={isUserActive ? activeClassName : normalLink} onClick={() => {
                                        setIsDashboardActive(false);
                                        setIsMedexerActive(false);
                                        setIsReportActive(false);
                                        setIsUserActive(true);
                                        //setIsReportdActive(false);
                                        //setIsImagesActive(false);
                                        //setIsAPItestActive(false);
                                    }}
                                >Profile</NavLink>
                            </div>
                                
                        </div>
                        */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
