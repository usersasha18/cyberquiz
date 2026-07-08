import { useState, useEffect } from "react"

import imgHeader from "../assets/imgHeader.png"
import Button from "./ui/Button";
import TestCount from "./ui/TestCount";

export default function Main() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('completedStudents');
            const students = raw ? JSON.parse(raw) : [];
            setCount(students.length);
        } catch (e) {
            setCount(0);
        }
    }, []);

return (
    <main className="relative min-h-screen overflow-hidden">
    <div className="theme-page-gradient absolute inset-0 -z-10 rotate-[135deg] scale-[4] transition-colors"></div>
    <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="theme-surface w-4/5 mx-auto border-[3px] rounded-3xl px-[70px] transition-colors">
        <div className="flex flex-row items-center gap-10">
            <div className="">
                <h1 className="theme-primary-text text-[74px] font-black italic leading-[80px] transition-colors">
                    КиберКвест:
                </h1>
                <p className="theme-primary-text max-w-[600px] text-[55px] font-black italic leading-[60px] mb-[15px] transition-colors">
                    научись защищать себя в интернете   
                </p>
                <p className="theme-muted-text max-w-[467px] text-[28px] font-extrabold leading-[34px] mb-[54px] transition-colors">
                    Играй, учись и прокачивай свои навыки безопасности
                </p>
                
                <Button title="Начать обучаться" img={imgHeader} to="/choose-game"/>
            </div>
                <div className="relative w-[800px] h-[600px] overflow-hidden flex-shrink-0">
                
                {/* <Canvas
                    className="absolute inset-0 w-full h-full"
                    camera={{ position: [0, 1.2, 10], fov: 32, near: 0.1, far: 3000 }}
                >
                    <ambientLight intensity={3} />
                    <directionalLight />
                        <group
                            position={[0, -1.5, 0]} scale={0.52}
                            rotation={[0.2, 0, 0]}
                        >
                            <Modal />
                        </group>
                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        minPolarAngle={Math.PI /2}
                        maxPolarAngle={Math.PI /2}
                        target={[0, -0.35, 0]}
                    />
                </Canvas> */}

                </div>
            </div>
        </div>
        <div className="">
            <TestCount count={count}/>
        </div>
    </div>
    </main>
    );
}
