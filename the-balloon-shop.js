module.exports = (pool) => {

    // insert valid colors into the database here

    async function getValidColors() {
        try {
            var checkColor = await pool.query(`select color_name from valid_color`);
            var list = [];

            checkColor.rows.forEach(function (element) {
                list.push(element.color_name)
            });
            return list;


        } catch (error) {
            console.log(error);
        }
    }

    async function requestColor(color) {

        try {
            var checkColor = await pool.query(`select color_name from invalid_color where color_name = $1`, [color])
            if (checkColor.rowCount == 0) {
                await pool.query(`insert into invalid_color (color_name,count) values ($1,$2)`, [color, 1])
            }
            else {
                await pool.query(`update invalid_color set count = count + 1 where color_name = $1`, [color])
            }
        } catch (error) {
            console.log(error);
        }

    }

    async function colorCount(color) {
        var checkColor = await pool.query(`select count from invalid_color where color_name = $1`, [color]);
        return checkColor.rows[0].count;
    }

    async function getInvalidColors() {
        try {
            let invalidColors = await pool.query('SELECT color_name from invalid_color');
           
            var list = [];

            invalidColors.rows.forEach(function (element) {
                list.push(element.color_name)
            });
            return list;


        } catch (error) {
            console.log(error);
        }
    }

    async function allColors() {
       try {
            
        let invalidColors = await pool.query('SELECT color_name from invalid_color');
        let invalidColors1 = await pool.query('SELECT color_name from valid_color');
        
        var list = [];

        invalidColors1.rows.forEach(function (element) {
            list.push(element.color_name)
        });

        invalidColors.rows.forEach(function (element) {
            list.push(element.color_name)
        });
        return list;
        
       } catch (error) {
           console.log(error)
       }
    }

    return {
        getValidColors,
        requestColor,
        colorCount,
        getInvalidColors,
        allColors,
    }
}