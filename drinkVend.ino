// This #include statement was automatically added by the Spark IDE.
#include "application.h"
#include "Adafruit-MotorShield-V2/Adafruit-MotorShield-V2.h"
#include "Adafruit-MotorShield-V2/Adafruit_PWMServoDriver.h"

/*
 Visit the following url for help on connecting the motor shield
 to the spark core:
 https://community.spark.io/t/adafruit-motor-shield-v2-progress/5218
*/


// Create the motor shield object with the default I2C address
Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 
// Or, create it with a different I2C address (say for stacking)
//Adafruit_MotorShield AFMS = Adafruit_MotorShield(0x61); 

// Select which 'port' M1, M2, M3 or M4. In this case, M3
Adafruit_DCMotor *myMotor0 = AFMS.getMotor(1);
Adafruit_DCMotor *myMotor1 = AFMS.getMotor(2);
Adafruit_DCMotor *myMotor2 = AFMS.getMotor(3);
Adafruit_DCMotor *myMotor3 = AFMS.getMotor(4);

Adafruit_DCMotor* myMotorArray[4];

// You can also make another motor on port M2
//Adafruit_DCMotor *myOtherMotor = AFMS.getMotor(2);

// You can also make a stepper motor on M1/M2
//Adafruit_StepperMotor *myMotor = AFMS.getStepper(200, 1);
int toMaking = 0;
String currCommand;
void mix(String command);
void drink();
int handler(String command);


void setup() {
    
    Serial.begin(9600);           // set up Serial library at 9600 bps
    Serial.println("Adafruit Motorshield v2 - DC Motor test!");
    
    myMotorArray[0] = myMotor0;
    myMotorArray[1] = myMotor1;
    myMotorArray[2] = myMotor2;
    myMotorArray[3] = myMotor3;

    AFMS.begin();  // create with the default frequency 1.6KHz
    myMotor1->setSpeed(255);
    myMotor2->setSpeed(255);
    myMotor3->setSpeed(255);
    myMotor0->setSpeed(255);
    Spark.function("mix", handler);
    Spark.variable("making", &toMaking, INT);

}

void loop() {
    
    if (toMaking){
        mix(currCommand);
        toMaking = 0;
    }
    
}


int handler(String command){
    
    currCommand = command;
    toMaking = 1;
    return 1;
    
}

void mix(String instructions) {
    
    int tymes[4];
    char *pointer = strtok(strdup(instructions.c_str()), ",");
    
    for(int i = 0; i < 4; i++){
        tymes[i] = atoi(pointer);
        pointer = strtok(NULL, ",");
    }
    
    drink(tymes);
    
   
}

void drink(int tymes[4]) {
    
    int min = 1000;
    int lastMin = 0;
    int index;
    
    myMotor0->run(FORWARD);
    myMotor1->run(FORWARD);
    myMotor2->run(FORWARD);
    myMotor3->run(FORWARD);
    

    for(int j = 0; j < 4; j++){
        
        for(int i = 0; i < 4; i++){
            
            if ((tymes[i] < min) && (tymes[i] >= 0)) {
                min = tymes[i];
                index = i;
            }
        
        }
        
        delay((min - lastMin) * 1000);
        myMotorArray[index]->run(RELEASE);
        lastMin = min;
        tymes[index] = -1;
    
    }
    
    
    return;
}
